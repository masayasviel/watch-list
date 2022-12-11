import {NextPage} from "next";
// import Card from "./card";
import ListTile from "./list-tile";

const Cards :NextPage = () => {
    const title = "カード"
    const kana = "カナ"
    const thumbnail =
    'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80';
    
    return (
        <>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
            <ListTile title={title} kana={kana} thumbnail={thumbnail}/>
        </>
        
    );
};

export default Cards;