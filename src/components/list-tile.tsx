import { Card, Flex, Group, Image, Text, Title } from '@mantine/core';

interface PropType {
  /** タイトル */
  title: string;
  /** 読みカナ */
  kana: string;
  /** サムネイル */
  thumbnail: string;
}

/** カード */
const ListTile = ({ title, kana, thumbnail }: PropType) => {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Group position="center" grow>
        <Image src={thumbnail} radius="md" />
        <Flex gap="md" justify="center" align="center" direction="column" wrap="nowrap">
          <Title order={3}>{title}</Title>
          <Text>{kana}</Text>
        </Flex>
      </Group>
    </Card>
  );
};

export default ListTile;
