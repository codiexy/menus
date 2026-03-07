import { orderBy, where } from 'firebase/firestore';

import Database from "./Database";
import Category from './Category';
import Like from './Like';
import Recommend from './Vote';
import Vote from './Vote';
import User from './User';
import { Dish } from '.';

export default class MenuDish extends Database {

  constructor() {
    super("Dishes");
  }

  getAll = async (options = {}) => {
    var queryOptions = [
      orderBy("createdAt", "desc"),
    ];
    const {
      isTopDishes = false,
      isVote = false,
      recommendation = false,
      upvote = false,
      like = false,
      category = "",
      from = "user"
    } = options;
    if (category) queryOptions.push(where('categoryId', '==', category));
    const result = await this.get(queryOptions);
    if (result.status) {
      if (isVote || like) {
        let data = result.data.map(async (dish) => {
          if (like) {
            const likeClass = new Like();
            const likeRes = await likeClass.get([
              where('dishId', "==", dish.id),
            ]);
            dish.likes = likeRes?.data || [];
            dish.isLiked = dish.likes.find(i => i.createdBy === this.user?.uid) || false;
          }

          // Get vote data of the dish
          if (isVote) {
            const voteClass = new Vote(dish.id);
            const voteRes = await voteClass.get([
              where('status', "==", 'active')
            ]);
            dish.votes = voteRes?.data || [];
            dish.isVote = dish.votes.find(i => i.createdBy === this.user?.uid) || false;
            dish.voteCount = dish.votes.reduce((a, b) => (b?.type === 'up' ? a + 1 : a - 1), 0);
            dish.upvotes = dish.votes.filter(i => i.type === "up");
            dish.downvotes = dish.votes.filter(i => i.type === "down");
          }
          return dish;
        })
        let dishes = await Promise.all(data.map(async (i) => await i));
        if (recommendation) {
          if (upvote) dishes = dishes.filter(i => i?.upvotes?.length > 0);
          dishes = dishes.filter(i => i?.votes?.length > 0)
          if (from === "user" && this.user) dishes = dishes.filter(i => i?.isVote);
        };

        // get topdishes by upvotes
        if (isTopDishes) {
          dishes = dishes.filter(i => i?.votes?.length > 0)
        }

        return dishes;
      }
    }
    return result?.data || [];
  }

  getPublishDish = async (options = {}) => {
    var queryOptions = [
      orderBy("createdAt", "desc"),
      where('status', "==", 'publish'),
    ];
    const {
      isTopDishes = false,
      isVote = false,
      recommendation = false,
      upvote = false,
      like = false,
      category = "",
      from = "user"
    } = options;
    if (category) queryOptions.push(where('categoryId', '==', category));
    const result = await this.get(queryOptions);
    if (result.status) {
      if (isVote || like) {
        let data = result.data.map(async (dish) => {
          if (like) {
            const likeClass = new Like();
            const likeRes = await likeClass.get([
              where('dishId', "==", dish.id),
            ]);
            dish.likes = likeRes?.data || [];
            dish.isLiked = dish.likes.find(i => i.createdBy === this.user?.uid) || false;
          }

          // Get vote data of the dish
          if (isVote) {
            const voteClass = new Vote(dish.id);
            const voteRes = await voteClass.get([
              where('status', "==", 'active')
            ]);
            dish.votes = voteRes?.data || [];
            dish.isVote = dish.votes.find(i => i.createdBy === this.user?.uid) || false;
            dish.voteCount = dish.votes.reduce((a, b) => (b?.type === 'up' ? a + 1 : a - 1), 0);
            dish.upvotes = dish.votes.filter(i => i.type === "up");
            dish.downvotes = dish.votes.filter(i => i.type === "down");
          }
          return dish;
        })
        let dishes = await Promise.all(data.map(async (i) => await i));
        if (recommendation) {
          if (upvote) dishes = dishes.filter(i => i?.upvotes?.length > 0);
          dishes = dishes.filter(i => i?.votes?.length > 0)
          if (from === "user" && this.user) dishes = dishes.filter(i => i?.isVote);
        };

        // get topdishes by upvotes
        if (isTopDishes) {
          dishes = dishes.filter(i => i?.votes?.length > 0)
        }

        return dishes;
      }
    }
    return result?.data || [];
  }

  getByCategory = async (value, options = {}, column = 'alias') => {
    let { dishId = "", categoryId = "", like = false, recommendation = false } = options || {};
    if (column === "id" || column === "_id") categoryId = value;
    if (!categoryId) {
      const categoryClass = new Category();
      const categoryResult = await categoryClass.first(value, column);
      categoryId = categoryResult?.data?.id || "";
    }
    if (categoryId) {
      let result = await this.getAll({
        category: categoryId,
        recommendation,
        isVote: true,
        like
      });
      return dishId ? (result.find(i => i.id === dishId) || false) : result;
    }
    return dishId ? false : [];
  }


  getByDishId = async (dishId) => {
    const result = await this.first(dishId);
    if (result.status) {
      return result;
    }
    return {};
  }
}