import { Request, Response } from 'express';
import axios from 'axios';

export const getAnime = async (req: Request, res: Response) => {
  const { name } = req.body;

  if(!name) {
    return res.status(400).send({message: 'Title is empty'})
  }

  try {
    const { data } = await axios.get(`https://frixysubs.pl/api/anime/${name}`);
    res.status(200).send(data);
  } catch (err: any) {
    res.status(500).send({ message: 'Error occurred' });
  }
}

export const getFromSeason = async (req: Request, res: Response) => {
  const { season, year } = req.body;
  const { offset } = req.body || 0;
  if(!season || !year) {
    return res.status(400).send({message: 'Season or year is empty'})
  }

  try {
    const { data } = await axios.get(`https://frixysubs.pl/api/anime?limit=30&offset=${offset}&season=${season},${year}&order_by=title&order=asc`);
    res.status(200).send(data);
  } catch (err: any) {
    res.status(500).send({ message: 'Error occurred' });
  }
}