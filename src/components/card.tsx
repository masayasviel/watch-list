import type { NextPage } from 'next';
import { Card as MantineCard, Image, Text, Badge, Button, Group } from '@mantine/core';

// typescript特有のキモいやつ
// これがないと動かない
/** 引数の型 */
interface PropType {
    /** タイトル */
    title: string;
    /** 読みカナ */
    kana: string;
}

/** カード */
const Card: NextPage<PropType> = ({ title, kana }: PropType) => {
  return (
    <>
        <MantineCard shadow="sm" p="lg" radius="md" withBorder>
            <MantineCard.Section>
                <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
                />
            </MantineCard.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{title}</Text>
                <Badge color="pink" variant="light">
                    {kana} 
                </Badge>
            </Group>

            <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </MantineCard>
    </>
  );
};

export default Card;
