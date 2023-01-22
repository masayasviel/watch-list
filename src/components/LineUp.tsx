import { NextPage } from 'next'
import { SimpleGrid } from '@mantine/core'
import ListTile from './list-tile';


const LineUp : NextPage = () => {
    const range = new Array(10).fill(0);
    const title = 'カード'
    const kana = 'カナ'
    const thumbnail = 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';

    return (
        <>
            <SimpleGrid
                cols={4}
                spacing='md'
                breakpoints={[
                    { maxWidth : 600, cols : 1, spacing : 'md'},
                    { maxWidth : 980, cols : 2, spacing : 'md'},
                ]}>
                {range.map((_) => (
                <ListTile title={title} kana={kana} thumbnail={thumbnail}></ListTile>
                ))}
            </SimpleGrid>
        </>
    )
}

export default LineUp;

