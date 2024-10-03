import ProfileModel from "../models/profileModel.js";

export const getProfiles = async (req, res) => {
    try {
        const profiles = await ProfileModel.findAll();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getProfileById = async (req, res) => {
    const profileId = req.params.id;
    try {
        const profile = await ProfileModel.findOne({ where: { id: profileId } });
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createProfile = async (req, res) => {
    try {
        const newProfile = await ProfileModel.create(req.body);
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateProfile = async (req, res) => {
    const profileId = req.params.id;
    try {
        await ProfileModel.update(req.body, { where: { id: profileId } });
        res.status(200).json({ message: `Profile ${profileId} successfully updated` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteProfile = async (req, res) => {
    const profileId = req.params.id;
    try {
        await ProfileModel.destroy({ where: { id: profileId } });
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getProfileByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const profile = await ProfileModel.findOne({ where: { userId: userId } });
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    };