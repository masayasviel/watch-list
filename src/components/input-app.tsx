import React, { useCallback, useState } from 'react';
import { useForm, isNotEmpty, matches } from '@mantine/form';
import { TextInput, Button, Box, Group, Image, Stack } from '@mantine/core';
import { Area, MediaSize } from 'react-easy-crop';

import { RegisterInterface } from '../interfaces/register.interface';
import getCroppedImg from '../hooks/get-cropped-image.hook';
import CropperModal, { ASPECT_RATIO, CROP_WIDTH } from './cropper-modal';
import dummyImage from '../assets/no-image.png';

interface PropType {
    /** タイトル */
    title: string;
    /** 読みカナ */
    kana: string;
    /** サムネイル */
    thumbnail: string;
    /** 登録か更新か */
    actionType: 'register' | 'update';
    /** 登録を押下 */
    onClickRegister: (param: RegisterInterface) => void;
}

const InputApp = ({ title, kana, actionType, onClickRegister, thumbnail }: PropType) => {
    const form = useForm({
        initialValues: {
            title: title,
            kana: kana,
        },
        validate: {
            title: isNotEmpty(),
            kana: matches(/^[ァ-ヴー]+$/),
        },
    });

    /** Cropモーダルの開閉 */
    const [isOpen, setIsOpen] = useState(false);
    /** アップロードした画像URL */
    const [imgSrc, setImgSrc] = useState("");
    /** 画像の拡大縮小倍率 */
    const [zoom, setZoom] = useState(1);
    /** 切り取る領域の情報 */
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    /** 切り取る領域の情報 */
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    /** 切り取ったあとの画像URL */
    const [croppedImgSrc, setCroppedImgSrc] = useState(thumbnail);

    /**
     * ファイルアップロード後
     * 画像ファイルのURLをセットしモーダルを表示する
     */
    const onFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    if (reader.result) {
                        setImgSrc(reader.result.toString() || "");
                        setIsOpen(true);
                    }
                });
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        []
    );

    /**
     * Cropper側で画像データ読み込み完了
     */
    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
        const { width, height } = mediaSize;
        const mediaAspectRadio = width / height;
        if (mediaAspectRadio > ASPECT_RATIO) {
            // 縦幅に合わせてZoomを指定
            const result = CROP_WIDTH / ASPECT_RATIO / height;
            setZoom(result);
            return;
        }
        // 横幅に合わせてZoomを指定
        const result = CROP_WIDTH / width;
        setZoom(result);
    }, []);

    /**
     * 切り取り完了後、切り取り領域の情報をセット
     */
    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    /**
     * 切り取り後の画像を生成し画面に表示
     */
    const showCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
        if (croppedImage == null) return;
        setCroppedImgSrc(croppedImage);
    }, [croppedAreaPixels, imgSrc]);

    /** 入力のエミット */
    const emitInputValue = () => {
        const base64String = croppedImgSrc.split(',')[1];
        onClickRegister({
            thumbnail: base64String,
            ...form.values
        });
    }

    return (
        <Box maw={320} mx="auto">
            <Stack>
                <TextInput
                    withAsterisk
                    label="タイトル"
                    placeholder="タイトル"
                    {...form.getInputProps('title')}
                    error={form.isValid('title') ? null : 'require'}
                />
                <TextInput
                    withAsterisk
                    mt="md"
                    label="読みカナ"
                    placeholder="読みカナ"
                    {...form.getInputProps('kana')}
                    error={form.isValid('kana') ? null : 'カタカナ'}
                />

                <Group position="center">
                    <Button component="label">
                        Upload File
                        <input type="file" hidden onChange={onFileChange} />
                    </Button>
                </Group>

                <div className="img-container">
                    {croppedImgSrc ? (
                        <Image maw={240} mx="auto" radius="md" src={croppedImgSrc} />
                    ) : (
                        <Image maw={240} mx="auto" radius="md" src={dummyImage} />
                    )}
                </div>

                <CropperModal
                    crop={crop}
                    setCrop={setCrop}
                    zoom={zoom}
                    setZoom={setZoom}
                    onCropComplete={onCropComplete}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    imgSrc={imgSrc}
                    showCroppedImage={showCroppedImage}
                    onMediaLoaded={onMediaLoaded}
                />

                <Group position="center" mt="xl">
                    <Button
                        disabled={!form.isValid() || !croppedImgSrc}
                        onClick={emitInputValue}
                    >{actionType === 'register' ? '登録' : '更新'}</Button>
                </Group>
            </Stack>
        </Box>
    );
}

export default InputApp;
