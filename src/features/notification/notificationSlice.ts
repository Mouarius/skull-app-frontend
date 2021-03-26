import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { NotificationObject, NotificationType } from '../../util/types';

const duration = 5000;
let timeout_id: NodeJS.Timeout;

export const sendErrorMessage = (message: string) => (
  dispatch: AppDispatch
): void => {
  clearTimeout(timeout_id);
  dispatch(setError(message));
  timeout_id = setTimeout(() => dispatch(clearMessage()), duration);
};
export const sendInfoMessage = (message: string) => (
  dispatch: AppDispatch
): void => {
  clearTimeout(timeout_id);
  dispatch(setInfo(message));
  timeout_id = setTimeout(() => dispatch(clearMessage()), duration);
};
export const sendSuccessMessage = (message: string) => (
  dispatch: AppDispatch
): void => {
  clearTimeout(timeout_id);
  dispatch(setSuccess(message));
  timeout_id = setTimeout(() => dispatch(clearMessage()), duration);
};

const initialState: NotificationObject = {
  type: NotificationType.INFO,
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationObject>) => {
      return {
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    hideNotification: (state, action: PayloadAction<NotificationObject>) => {
      return {
        type: action.payload.type,
        message: action.payload.message,
      };
    },

    setInfo: (state, action) => {
      return {
        type: NotificationType.INFO,
        message: action.payload,
      };
    },
    setError: (state, action) => {
      return {
        type: NotificationType.ERROR,
        message: action.payload,
      };
    },
    setSuccess: (state, action) => {
      return {
        type: NotificationType.SUCCESS,
        message: action.payload,
      };
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
});

export const selectNotification = (state: RootState): NotificationObject =>
  state.notification;

export const {
  setInfo,
  setError,
  setSuccess,
  clearMessage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
