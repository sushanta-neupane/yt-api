import { NextResponse } from "next/server";
import Cors from 'cors'
import ytdl from "ytdl-core";


const cors = Cors({
  methods: ['GET'],
  origin: '*', 
  optionsSuccessStatus: 200
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const GET = async (req,res) => {
  try {
    await runMiddleware(req,res,cors)
    const reqUrl = req.url.split("/");
    const vid = reqUrl[reqUrl.length - 1];
    const info = await ytdl.getInfo(vid);
    const formatV = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });
    const formatA = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
    
    const { videoDetails } = info;
    
    const formatB =   info["player_response"]["streamingData"]["formats"][0]["url"]
    const {expiresInSeconds} =  info["player_response"]["streamingData"]
    const thumbnail = videoDetails["thumbnails"][0]["url"];
    const {ownerChannelName} = videoDetails
    const channelThumbnail = videoDetails["author"]["thumbnails"][0]["url"]
    const {title} = videoDetails
    const {publishDate} = videoDetails
    const {lengthSeconds} = videoDetails
    const {viewCount} = videoDetails
    
    const videoLink = formatV.url;
    const audioLink = formatA.url;

    const allData = {
        thumbnail : thumbnail ,
        channelThumbnail : channelThumbnail,
        ownerChannelName : ownerChannelName,
        title : title,
        publishDate : publishDate,
        lengthSeconds : lengthSeconds,
        viewCount : viewCount,
        videoLink : videoLink,
        audioLink : audioLink,
        audioVideoLink : formatB,
        expiresInSeconds : expiresInSeconds,
    }

    return new NextResponse(JSON.stringify(allData));
  } catch (error) {
    return new NextResponse(JSON.stringify({error : error,"message":"enter valid id"}));
  }
};

export const dynamic = "force-dynamic";
