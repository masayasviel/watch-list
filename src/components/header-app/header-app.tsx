import {
    Button,
    Container,
    Title,
    Modal,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import style from './header-app.module.css';
import LoginApp from '../login';
import { logout } from '../../hooks/firebase.hook';
import { RootStateType } from '../../store';

const HeaderApp = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const selector = useSelector((state: RootStateType) => state.authentication);

    const onClickLoginButton = async () => {
        close();
        notifications.show({
            withCloseButton: true,
            autoClose: 1000,
            message: 'ログインしました',
        });
    };

    const onClickLogoutButton = async () => {
        await logout();
        notifications.show({
            withCloseButton: true,
            autoClose: 1000,
            message: 'ログアウトしました',
        });
    };

    return (
        <>
            <Modal opened={opened} onClose={onClickLoginButton} title="ログイン">
                <LoginApp
                    closeDialog={onClickLoginButton}
                ></LoginApp>
            </Modal>

            <Container className={style.inner} fluid>
                <Title order={1}>観たアニメ！</Title>
                {
                    selector == null
                        ? <Button onClick={open}>ログイン</Button>
                        : <Button onClick={onClickLogoutButton}>ログアウト</Button>
                }
            </Container>
        </>
    );
};
export default HeaderApp;
