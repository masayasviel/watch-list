import React from 'react';
import {
    Card,
    Flex,
    Group,
    Image,
    Text,
    Title,
    Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import InputApp from './input-app';
import { RegisterInterface } from '../interfaces/register.interface';

interface PropType {
    /** タイトル */
    title: string;
    /** 読みカナ */
    kana: string;
    /** サムネイル */
    thumbnail: string;
}

/** カード */
const CardApp = ({ title, kana, thumbnail }: PropType) => {
    const [opened, { open, close }] = useDisclosure(false);
    const actionType = 'update';

    const onClickRegister = (param: RegisterInterface) => {
        console.log(param);
        close();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="更新">
                <InputApp
                    title={title}
                    kana={kana}
                    thumbnail={thumbnail}
                    actionType={actionType}
                    onClickRegister={onClickRegister}
                ></InputApp>
            </Modal>

            <Card
                shadow="sm"
                p="md"
                radius="md"
                withBorder
                onClick={open}
            >
                <Group position="center" grow>
                    <Image src={thumbnail} radius="md"/>
                    <Flex gap="md" justify="center" align="center" direction="column" wrap="nowrap">
                        <Title order={3}>{title}</Title>
                        <Text>{kana}</Text>
                    </Flex>
                </Group>
            </Card>
        </>
    );
};

export default CardApp;
