import React from 'react';
import { isEmail, matches, useForm } from '@mantine/form';
import { TextInput, Button, Box, Group, Image } from '@mantine/core';

import { login } from '../hooks/firebase.hook';

interface PropType {
    closeDialog: () => void;
}

const LoginApp = ({ closeDialog }: PropType) => {
    const form = useForm({
        initialValues: {
            user: '',
            password: '',
        },
        validate: {
            user: isEmail(),
            password: matches(/^[a-zA-Z0-9]+$/),
        },
    });

    const onClickLoginButton = async (): Promise<void> => {
        const { user, password } = form.values;
        await login(user, password);
        closeDialog();
    };

    return (
        <Box maw={320} mx="auto">
            <TextInput
                withAsterisk
                label="ユーザ名"
                placeholder="ユーザ名"
                {...form.getInputProps('user')}
                error={form.isValid('user') ? null : 'require'}
            />
            <TextInput
                withAsterisk
                label="パスワード"
                placeholder="パスワード"
                {...form.getInputProps('password')}
                error={form.isValid('password') ? null : 'require'}
            />
            <Group position="center" mt="xl">
                <Button
                    disabled={!form.isValid()}
                    onClick={onClickLoginButton}
                >ログイン</Button>
            </Group>
        </Box>
    );
}

export default LoginApp;

