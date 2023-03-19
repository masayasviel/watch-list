import React from 'react';
import {AppShell, Header, SimpleGrid} from '@mantine/core';
import HeaderApp from "./components/header";
import CardApp from "./components/card-app";

function App() {
    const range = new Array(10).fill(0);
    const thumbnail = 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';

    return (
        <AppShell
            padding="md"
            header={
                <Header height={60} p="xs">{
                    <HeaderApp></HeaderApp>
                }</Header>
            }
        >
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
        </AppShell>
    );
}

export default App;
