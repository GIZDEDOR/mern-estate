import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Объект не найден'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'Вы можете удалять только свои объекты!'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Объект удалён!');
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Объект не найден'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'Вы можете изменять только свои объекты!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try  {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Обьект не найден'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}