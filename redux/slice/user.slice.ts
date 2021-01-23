import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Me, Login } from '../../generated/generate-types';
import { QUERY_ME } from '../../graphql/auth/auth.graphql';
import { client } from '../../graphql/config';

export const fetchAPIMe = createAsyncThunk(
    'user/featchAPIMe',
    async () => {
        const data = await client.query<Me.Query>({
            query: QUERY_ME
        })
        .then(res => {
            if (res.data && res.data.me) {
                return res.data.me
            }
        })
        return data
    }
)

const initialState = { user: null, token: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Login.UserWithTokenInlineFragment | any>) => {
            if (action.payload.token) {
                state.user = action.payload.user
                state.token = action.payload.token
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAPIMe.fulfilled, (state, action: PayloadAction<Me.Me>) => {
            state.user = action.payload
        }),
        builder.addCase(fetchAPIMe.rejected, (state, action) => {
            state.user = action.payload,
            state.token = action.payload
        })
    }
})

export const { login } = userSlice.actions
export default userSlice.reducer