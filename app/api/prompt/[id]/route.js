import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    const { prompt, tag } = await request.json();
    if (!prompt || !tag)
      return new Response("Invalid data provided", { status: 400 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
