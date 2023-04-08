import {
    Button,
    Group,
    Slider,
    createStyles,
    Modal,
} from '@mantine/core';
import Cropper, { Area, MediaSize } from 'react-easy-crop';

/** アスペクト比 */
export const ASPECT_RATIO = 4 / 3;
/** クロッパーの幅 */
export const CROP_WIDTH = 400;

const useStyles = createStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        width: 420,
        height: 500,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column',
        borderRadius: '0px 0px 10px 10px',
        '& .crop-container': {
            height: 400,
            borderRadius: '10px 10px 0px 0px',
            backgroundColor: '#f4f7fb',
            position: 'relative',
        }
    }
}));

interface PropType {
    crop: {
        x: number;
        y: number;
    };
    setCrop: (crop: { x: number; y: number }) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
    open: boolean;
    onClose: () => void;
    imgSrc: string;
    showCroppedImage: () => void;
    onMediaLoaded: (mediaSize: MediaSize) => void;
}

const CropperModal = ({
    crop,
    setCrop,
    onCropComplete,
    setZoom,
    zoom,
    open,
    onClose,
    imgSrc,
    showCroppedImage,
    onMediaLoaded,
}: PropType) => {
    const minZoom = 1;
    const maxZoom = minZoom + 1;

    const { classes } = useStyles();

    return (
        <Modal opened={open} onClose={onClose} className={classes.root}>
            <div className={classes.modal}>
                <div className="crop-container">
                    <Cropper
                        image={imgSrc}
                        crop={crop}
                        zoom={zoom}
                        minZoom={minZoom}
                        maxZoom={maxZoom}
                        aspect={ASPECT_RATIO}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onMediaLoaded={onMediaLoaded}
                    />
                </div>
                <Slider
                    min={minZoom}
                    max={maxZoom}
                    label={(value) => value.toFixed(1)}
                    value={zoom}
                    step={0.1}
                    onChange={setZoom}
                />
            </div>
            <Group position="center" mt="xl">
                <Button
                    onClick={() => {
                        onClose();
                        showCroppedImage();
                    }}
                >OK</Button>
            </Group>
        </Modal>
    );
};

export default CropperModal;
