import { useForm, isNotEmpty, matches } from '@mantine/form';
import { TextInput, Button, Group, Box } from '@mantine/core';

interface PropType {
    /** タイトル */
    title: string;
    /** 読みカナ */
    kana: string;
    /** 登録か更新か */
    actionType: 'register' | 'update';
}

const InputApp = ({ title, kana, actionType }: PropType) => {
    const form = useForm({
        initialValues: {
            title: title,
            kana: kana,
        },
        validate: {
            title: isNotEmpty(),
            kana: matches(/^[ァ-ヴー]+$/),
        },
    });

    const emitInputValue = () => {
        console.log(form.values);
    }

    return (
        <Box maw={320} mx="auto">
            <TextInput
                withAsterisk
                label="タイトル"
                placeholder="タイトル"
                {...form.getInputProps('title')}
                error={form.isValid('title') ? null : 'require'}
            />
            <TextInput
                withAsterisk
                mt="md"
                label="読みカナ"
                placeholder="読みカナ"
                {...form.getInputProps('kana')}
                error={form.isValid('kana') ? null : 'カタカナ'}
            />

            <Group position="center" mt="xl">
                <Button
                    disabled={!form.isValid()}
                    onClick={emitInputValue}
                >{actionType === 'register' ? '登録' : '更新'}</Button>
            </Group>
        </Box>
    );
}

export default InputApp;
