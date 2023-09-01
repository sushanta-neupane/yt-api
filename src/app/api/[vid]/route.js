import { NextResponse } from "next/server";

import ytdl from "ytdl-core";

// GET => get all products
export const GET = async (req) => {
  try {
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
