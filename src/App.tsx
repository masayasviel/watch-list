import { useEffect } from 'react';
import { AppShell, Button, Header, Modal, SimpleGrid, Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useSelector } from 'react-redux';

import style from './App.module.css';
import HeaderApp from './components/header-app/header-app';
import CardApp from './components/card-app';
import InputApp from './components/input-app';
import { list, register } from './hooks/firebase.hook';
import { RootStateType } from './store';
import { RegisterInterface } from './interfaces/register.interface';

function App() {
    useEffect(() => {
        list().then();
    }, []);

    const authentication = useSelector((state: RootStateType) => state.state.authentication);
    const animeList = useSelector((state: RootStateType) => state.state.animeList);

    const [opened, { open, close }] = useDisclosure(false);
    const onClickRegister = async (param: RegisterInterface) => {
        await register(param);
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
            <Container className={style.postBtn}>{
                authentication ? <Button onClick={open} size="xl">登録</Button> : <></>
            }</Container>

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
                {animeList.map(item =>
                    <Container key={item.id}>
                        <CardApp
                            id={item.id}
                            title={item.title}
                            kana={item.kana}
                            thumbnail={item.thumbnail}
                        ></CardApp>
                    </Container>
                )}
            </SimpleGrid>
        </AppShell>
    );
}

export default App;
