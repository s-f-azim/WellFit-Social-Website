import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import API from '../../../config';
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
          return { status: 'success', data: user.data };
        }
      } catch (e) {
        console.log(e);
      }
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.token;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {},
};

export default (req, res) => NextAuth(req, res, options);
