import { useState } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import ItemMenu from '../ItemMenu';
import EditDish from './EditDish';
import ArchiveDish from './ArchiveDish';

const DishCard = ({ dish }) => {
    const [isLoader, setIsLoader] = useState(false);
    const { id, name, imageUrl } = dish;
    const dishUrl = isLoader ? "/Loading_icon.gif" : imageUrl ? imageUrl : "/dish-612x612.jpg";
    return (
        <>
            <Card sx={{ minHeight: '130px', minWidth: 130, maxWidth: 300, maxHeight: 350 }} key={id}>
                <CardCover>
                    <img
                        src={name === "No image" ? "https://sgame.etsisi.upm.es/pictures/12946.png?1608547866/" : dishUrl}
                        alt=""
                    />
                </CardCover>
                <CardCover
                    sx={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
                    }}
                />
                <CardContent sx={{ justifyContent: 'flex-end' }}>
                    <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                        <ItemMenu dish={dish} setIsLoader={setIsLoader} />
                        <EditDish dish={dish} setIsLoader={setIsLoader} />
                        <ArchiveDish dish={dish} setIsLoader={setIsLoader} />
                    </Typography>
                    <Typography
                        textColor='#fff'
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                        }}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default DishCard;