import api from '@/api/Api';
import {
    SET_LOADING,
    SET_LIKED_USERS
} from './mutationTypes';
import { userMapper } from '../services/Normalizer';

export default {
    async getUsersByIdsCollection({ commit }, ids) {
        commit(SET_LOADING, true, { root: true });

        try {
            const users = await api.post('/users', { usersIds: ids });

            commit(SET_LIKED_USERS, users);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve(users.map(userMapper));
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    }
};
