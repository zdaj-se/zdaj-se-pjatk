import { NowRequest, NowResponse } from '@vercel/node';
import commentController from '../../../../../../../backend/comments/comments.controller';

export default (req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {
    commentController(req, res);
  }
  res.status(404).json({ ok: false });
};
