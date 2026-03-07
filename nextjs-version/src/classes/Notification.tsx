import moment from "moment";
import { where } from "firebase/firestore";

import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Database from "./Database";
import User from './User';

export default class Notification extends Database {

    constructor(tenantId: string | null) {
        super(tenantId, "notifications");
    }

    create = async (inputData = {}) => {
        if (Object.keys(inputData).length) {
            return this.insert({
                ...inputData,
                isRead: false
            })
        }
    }

    markedAsRead = async (id = "") => {
        if (id) {
            const result: any = await this.update(id, { isRead: true });
            return result.status;
        } else {
            const result = await this.get([
                where('isRead', "==", false)
            ]);
            if (result.length) {
                const ids = result.map(data => data.id);
                for (let i = 0; i < ids.length; i++) {
                    await this.update(ids[i], { isRead: true });
                }
                return true;
            }
            return false;
        }
    }

    getAll = async (options: any = {}) => {
        options = typeof options === "object" && Object.keys(options).length ? options : {};
        const { limit, unread, read, pagination, start } = options;
        const conditions: any = [];
        if (unread === true) { conditions.push(where('isRead', "==", false)); }
        if (read === true) { conditions.push(where('isRead', "==", true)); }
        if (pagination === true) {
            const result = await this.pagination(limit, start, conditions);
            if (result.status) {
                const data = result.data.data.map(async (like) => await this._formatData(like))
                return {
                    ...result.data,
                    data: await Promise.all(data.map(async (i) => await i))
                }
            }
            return {
                limit,
                start,
                count: 0,
                data: []
            };
        } else {
            if (limit > 0) { conditions.push(limit(limit)); }
            const result = await this.get(conditions);
            if (result.length) {
                const data = result.map(async (like) => await this._formatData(like))
                return await Promise.all(data.map(async (i) => await i));
            }
            return [];
        }

    }

    _formatData = async (data: any) => {
        if (!data) return false;
        let newData: any = {
            time: moment(data.createdAt.toDate()).fromNow()
        };
        const userClass = new User(this.tenantId);
        const result = await userClass.first(data.createdBy)
        data.creator = result?.data || false;
        switch (data.type) {
            case 'user':
                newData = this._getUserData(data);
                break;
            case 'comment':
                newData = this._getCommentData(data);
                break;
            case 'favorite':
                newData = this._getFavoriteData(data);
                break;
            case 'reply':
                newData = this._getReplyData(data);
                break;
            case 'review':
                newData = this._getReviewData(data);
                break;
            case 'recommend':
                newData = this._getRecommendData(data);
                break;

            default:
                break;
        }
        return {
            ...data,
            ...newData
        }
    }

    _getUserData = async (data: any) => {

        switch (data.action) {
            case "create":
                data.icon = <PersonAddIcon />;
                data.title = "Register New User";
                data.description = (
                    <>{data.refrenceName} registered as a new user.</>
                )
                break;

            default:
                break;
        }
        return data;
    }

    _getCommentData = async (data: any) => {
        switch (data.action) {
            case "create":
                data.icon = <AddCommentIcon />;
                data.title = "New Comment";
                data.description = (
                    <>New comment created for {data.parentName} dish menu.</>
                )
                break;
            case "update":
                data.icon = <EditIcon />;
                data.title = "Update Comment";
                data.description = (
                    <>Comment updated for {data.parentName} dish menu.</>
                )
                break;
            case "delete":
                data.icon = <DeleteForeverIcon />;
                data.title = "New Comment";
                data.description = (
                    <>Comment deleted for {data.parentName} dish menu.</>
                )
                break;
            default:
                break;
        }
        return data;
    }

    _getReplyData = async (data: any) => {
        switch (data.action) {
            case "create":
                data.icon = <ReplyIcon />;
                data.title = "New ";
                data.description = (
                    <>New comment&lsquo;s reply in {data.parentName} dish menu.</>
                )
                break;
            case "update":
                data.icon = <EditIcon />;
                data.title = "Update Comment's Reply";
                data.description = (
                    <>Update comment&lsquo;s reply in {data.parentName} dish menu.</>
                )
                break;
            case "delete":
                data.icon = <DeleteForeverIcon />;
                data.title = "New Comment's Reply";
                data.description = (
                    <>Comment&lsquo;s reply deleted in {data.parentName} dish menu.</>
                )
                break;
            default:
                break;
        }
        return data;
    }

    _getFavoriteData = async (data: any) => {
        switch (data.action) {
            case "liked":
                data.icon = <ThumbUpIcon />;
                data.title = "Like";
                data.description = (
                    <>{data?.creator?.name || "no name"} liked {data.parentName} dish.</>
                )
                break;
            case "unliked":
                data.icon = <ThumbDownIcon />;
                data.title = "Dislike";
                data.description = (
                    <>{data?.creator?.name || "no name"} disliked {data.parentName} dish.</>
                )
                break;
            default:
                break;
        }
        return data;
    }

    _getReviewData = async (data: any) => {
        switch (data.action) {
            case "create":
                data.icon = <ReviewsIcon />;
                data.title = "Review";
                data.description = (
                    <>Added new review by {data?.creator?.name || "no name"}.</>
                )
                break;
            default:
                break;
        }
        return data;
    }

    _getRecommendData = async (data: any) => {
        switch (data.subType) {
            case "up":
                data.icon = <BiUpvote />;
                data.title = "Upvote";
                data.description = (
                    <>
                        {
                            data.action === "create" ? (
                                <>
                                    {data.parentName} dish recommended by {data?.creator?.name || "no name"}.
                                </>
                            ) : (
                                <>
                                    {data.parentName} dish removed from recommended by {data?.creator?.name || "no name"}.
                                </>
                            )
                        }
                    </>
                )
                break;
            case "down":
                data.icon = <BiDownvote />;
                data.title = "Downvote";
                data.description = (
                    <>
                        {
                            data.action === "create" ? (
                                <>
                                    {data.parentName} dish downvote by {data?.creator?.name || "no name"}.
                                </>
                            ) : (
                                <>
                                    {data.parentName} dish removed from downvote by {data?.creator?.name || "no name"}.
                                </>
                            )
                        }
                    </>
                )
                break;
            default:
                break;
        }
        return data;
    }
}