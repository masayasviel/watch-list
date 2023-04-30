import { useEffect, useState } from 'react';
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
import { notifications } from '@mantine/notifications';

import InputApp from './input-app';
import { RegisterInterface } from '../interfaces/register.interface';
import { getImageUri, update } from '../hooks/firebase.hook';
import { useSelector } from 'react-redux';
import { RootStateType } from '../store';

interface PropType {
    /** id */
    id: string;
    /** タイトル */
    title: string;
    /** 読みカナ */
    kana: string;
    /** サムネイル */
    thumbnail: string;
}

/** カード */
const CardApp = ({ id, title, kana, thumbnail }: PropType) => {
    const [opened, { open, close }] = useDisclosure(false);
    const actionType = 'update';

    const [
        thumbnailUri,
        setThumbnailUri
    ] = useState<string>('');

    useEffect(() => {
        getImageUri(thumbnail).then((e) => {
            setThumbnailUri(e);
        })
    }, []);

    const selector = useSelector((state: RootStateType) => state.state.authentication);

    const onClickCard = () => {
        if (!selector) {
            return;
        }
        open();
    }

    const onClickUpdate = async (param: RegisterInterface) => {
        await update(id, {
            uuid: thumbnail,
            ...param
        })
        close();
        notifications.show({
            withCloseButton: true,
            autoClose: 1000,
            message: '更新完了',
        });
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="更新">
                <InputApp
                    title={title}
                    kana={kana}
                    thumbnail={''}
                    actionType={actionType}
                    onClickRegister={onClickUpdate}
                ></InputApp>
            </Modal>

            <Card
                shadow="sm"
                p="md"
                radius="md"
                withBorder
                onClick={onClickCard}
            >
                <Group position="center" grow>
                    <Image src={thumbnailUri} radius="md"/>
                    <Flex gap="md" justify="center" align="center" direction="column" wrap="nowrap">
                        <Title order={3}>{title}</Title>
                        <Text fz="xs">{kana}</Text>
                    </Flex>
                </Group>
            </Card>
        </>
    );
};

export default CardApp;
