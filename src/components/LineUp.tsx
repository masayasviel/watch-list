import { NextPage } from 'next'
import Cards from './cards'
import { SimpleGrid } from '@mantine/core'

const LineUp : NextPage = () => {
    return (
        <>
            <SimpleGrid
                cols={4}
                spacing='md'
                breakpoints={[
                    { maxWidth : 600, cols : 1, spacing : 'md'},
                    { maxWidth : 980, cols : 2, spacing : 'md'},
                ]}>
                    <Cards></Cards>
            </SimpleGrid>
        </>
    )
}

export default LineUp;