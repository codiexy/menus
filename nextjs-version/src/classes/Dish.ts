import { orderBy, where } from 'firebase/firestore';

import Database from "./Database";
import Category from './Category';
import Like from './Like';
import Vote from './Vote';

export default class Dish extends Database {

  constructor(tenantId: string | null) {
    super(tenantId, "dishes");
  }

  getAll = async (options = {}) => {
    const {
      isTopDishes = false,
      isVote = false,
      recommendation = false,
      upvote = false,
      like = false,
      category = "",
      from = "user"
    }: any = options;
    var queryOptions: any = [
      // orderBy("createdAt", "desc"),
    ];
    if (category) queryOptions.push(where('categoryId', '==', category));
    const results = await this.get(queryOptions);
    if (results.length) {
      if (isVote || like) {
        let data = results.map(async (dish) => {
          if (like) {
            const likeClass = new Like(this.tenantId);
            const likeRes = await likeClass.get([
              where('dishId', "==", dish.id),
            ]);
            dish.likes = likeRes || [];
            dish.isLiked = dish.likes.find((i: any) => i.createdBy === this.user?.uid) || false;
          }

          // Get vote data of the dish
          if (isVote) {
            const voteClass = new Vote(this.tenantId, dish.id);
            const voteRes = await voteClass.get([
              where('status', "==", 'active')
            ]);
            dish.votes = voteRes || [];
            dish.isVote = dish.votes.find((i: any) => i.createdBy === this.user?.uid) || false;
            dish.voteCount = dish.votes.reduce((a: any, b: any) => (b?.type === 'up' ? a + 1 : a - 1), 0);
            dish.upvotes = dish.votes.filter((i: any) => i.type === "up");
            dish.downvotes = dish.votes.filter((i: any) => i.type === "down");
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
    return results || [];
  }

  getPublishDish = async (options: any = {}) => {
    var queryOptions: any = [
      // orderBy("createdAt", "desc"),
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
    }: any = options;
    if (category) queryOptions.push(where('categoryId', '==', category));
    const result = await this.get(queryOptions);
    if (result) {
      if (isVote || like) {
        let data = result.map(async (dish) => {
          if (like) {
            const likeClass = new Like(this.tenantId);
            const likeRes = await likeClass.get([
              where('dishId', "==", dish.id),
            ]);
            dish.likes = likeRes || [];
            dish.isLiked = dish.likes.find((i: any) => i.createdBy === this.user?.uid) || false;
          }

          // Get vote data of the dish
          if (isVote) {
            const voteClass = new Vote(this.tenantId, dish.id);
            const voteRes = await voteClass.get([
              where('status', "==", 'active')
            ]);
            dish.votes = voteRes || [];
            dish.isVote = dish.votes.find((i: any) => i.createdBy === this.user?.uid) || false;
            dish.voteCount = dish.votes.reduce((a: any, b: any) => (b?.type === 'up' ? a + 1 : a - 1), 0);
            dish.upvotes = dish.votes.filter((i: any) => i.type === "up");
            dish.downvotes = dish.votes.filter((i: any) => i.type === "down");
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
    return result || [];
  }

  getByCategory = async (value: any, options = {}, column = 'alias') => {
    let { dishId = "", categoryId = "", like = false, recommendation = false }: any = options || {};
    
    if (column === "id" || column === "_id") categoryId = value;
    if (!categoryId) {
      const categoryClass = new Category(this.tenantId);
      const categoryResult = await categoryClass.first(value, column);
      categoryId = categoryResult?.id || "";
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


  getByDishId = async (dishId: string) => {
    return await this.first(dishId);
  }
}