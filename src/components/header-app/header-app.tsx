import React from 'react';
import {
    Button,
    Container,
    Title,
    Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import InputApp from '../input-app';
import style from './header-app.module.css';
import { RegisterInterface } from '../../interfaces/register.interface';

const HeaderApp = () => {
    const title = '';
    const kana = '';
    const thumbnail = '';
    const actionType = 'register';
    const [opened, { open, close }] = useDisclosure(false);

    const onClickRegister = (param: RegisterInterface) => {
        console.log(param);
        close();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="登録">
                <InputApp
                    title={title}
                    kana={kana}
                    thumbnail={thumbnail}
                    actionType={actionType}
                    onClickRegister={onClickRegister}
                ></InputApp>
            </Modal>

            <Container className={style.inner} fluid>
                <Title order={1}>観たアニメ！</Title>
                <Button onClick={open}>登録</Button>
            </Container>
        </>
    );
};
export default HeaderApp;
