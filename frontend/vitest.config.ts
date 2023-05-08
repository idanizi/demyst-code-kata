import reactPlugin from '@vitejs/plugin-react';

export default {
    plugins: [reactPlugin()],
    test: {
        include: [/\.test\./],
    },
};