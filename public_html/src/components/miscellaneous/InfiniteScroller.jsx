import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";

const InfiniteScroller = ({ children, handleNext, totalCount, limit }) => {
    const [start, setStart] = useState(0);
    const [hasMore, setHasMore] = useState(totalCount > limit);

    const handleScrollNext = async () => {
        let newStart = start + limit;
        if (newStart >= totalCount) {
            setHasMore(false);
            return;
        }
        if (typeof handleNext === "function") {
            await handleNext(newStart);
        }
        setStart(newStart);
    }

    return (
        <InfiniteScroll
            dataLength={start + limit}
            next={handleScrollNext}
            hasMore={hasMore}
            loader={<Typography sx={{ textAlign: 'center', my: 2 }}>
                <CircularProgress />
            </Typography>}
            endMessage={<div></div>}
        >
            {children}
        </InfiniteScroll>
    )
}

export default InfiniteScroller;