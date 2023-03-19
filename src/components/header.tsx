import React from 'react';
import {Button, Group, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

import InputApp from './input-app';

const HeaderApp = () => {
    const title = '';
    const kana = '';
    const actionType = 'register';
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Modal opened={opened} onClose={close} title="登録">
                <InputApp title={title} kana={kana} actionType={actionType}></InputApp>
            </Modal>

            <Group position="center">
                <Button onClick={open}>登録</Button>
            </Group>
        </div>
    );
};
export default HeaderApp;