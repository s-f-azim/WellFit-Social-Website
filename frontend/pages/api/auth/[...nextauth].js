/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import api from '../../../services/api';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await api.post(
          '/users/login',
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        );
        if (user) {
          return { success: 'success', data: user.data };
        }
      } catch (e) {}
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.token;
      api.defaults.headers.Authorization = `Bearer ${user.data.token}`;
      token.user = user.data.data;
    }
    return Promise.resolve(token);
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    session.user = token.user;
    return Promise.resolve(session);
  },
};

const options = {
  providers,
  callbacks,
  pages: {},
};

export default (req, res) => NextAuth(req, res, options);
