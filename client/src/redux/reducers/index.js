import { authReducer } from './authReducer';
import { messageReducer } from './messageReducer';
import { loaderReducer } from './loaderReducer';

const reducers = {
    auth: authReducer,
    message: messageReducer,
    loader: loaderReducer,
}

export default reducers;