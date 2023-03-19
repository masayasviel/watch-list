import React from 'react';
import {Card, Flex, Group, Image, Modal, Text, Title} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import InputApp from './input-app';

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

    return (
        <>
            <Modal opened={opened} onClose={close} title="更新">
                <InputApp title={title} kana={kana} actionType={actionType}></InputApp>
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
