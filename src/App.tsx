import React from 'react';
import {AppShell, Button, Header, Modal, SimpleGrid} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';

import HeaderApp from './components/header-app/header-app';
import CardApp from './components/card-app';
import InputApp from './components/input-app';
import { RootStateType } from './store';
import { RegisterInterface } from './interfaces/register.interface';

function App() {
    const range = new Array(10).fill(0);
    const thumbnail = 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';

    const [opened, { open, close }] = useDisclosure(false);
    const selector = useSelector((state: RootStateType) => state.authentication);
    const onClickRegister = (param: RegisterInterface) => {
        console.log(param);
        close();
        notifications.show({
            withCloseButton: true,
            autoClose: 1000,
            message: '登録成功',
        });
    }

    return (
        <AppShell
            padding="md"
            header={
                <Header height={60} p="xs">{
                    <HeaderApp></HeaderApp>
                }</Header>
            }
        >
            <Modal opened={opened} onClose={close} title="登録">
                <InputApp
                    title={''}
                    kana={''}
                    thumbnail={''}
                    actionType={'register'}
                    onClickRegister={onClickRegister}
                ></InputApp>
            </Modal>

            <SimpleGrid
                cols={4}
                spacing='md'
                breakpoints={[
                    { maxWidth : 600, cols : 1, spacing : 'md' },
                    { maxWidth : 980, cols : 2, spacing : 'md' },
                ]}
            >
                {range.map(_ => <CardApp title='タイトル' kana='カナ' thumbnail={thumbnail}></CardApp>)}
            </SimpleGrid>
            {
                selector == null ? <Button onClick={open}>登録</Button> : <></>
            }
        </AppShell>
    );
}

export default App;
