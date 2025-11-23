import toast from 'react-hot-toast';

export const useToast = () => {
    return {
        success: (message, options = {}) => {
            return toast.success(message, {
                duration: 3000,
                position: 'top-right',
                ...options,
            });
        },
        error: (message, options = {}) => {
            return toast.error(message, {
                duration: 3000,
                position: 'top-right',
                ...options,
            });
        },
        loading: (message, options = {}) => {
            return toast.loading(message, {
                position: 'top-right',
                ...options,
            });
        },
        promise: (promise, messages, options = {}) => {
            return toast.promise(
                promise,
                {
                    loading: messages.loading,
                    success: messages.success,
                    error: messages.error,
                },
                {
                    position: 'top-right',
                    ...options,
                }
            );
        },
        info: (message, options = {}) => {
            return toast(message, {
                duration: 3000,
                position: 'top-right',
                ...options,
            });
        },
        dismiss: (toastId) => {
            toast.dismiss(toastId);
        },
        dismissAll: () => {
            toast.dismiss();
        },
    };
};

export default useToast;
