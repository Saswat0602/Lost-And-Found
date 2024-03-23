import Item from "../model/items.js";
import Response from "../model/response.js";

const createResponse = async (req, res) => {
  try {
    const { authorId, itemId, answer } = req.body;

    const response = new Response({
      author: authorId,
      item: itemId,
      answer: answer,
    });

    const savedResponse = await response.save();

    res.status(201).json(savedResponse);
  } catch (error) {
    console.error("Error creating response:", error);
    res.status(500).json({ error: "Could not create response" });
  }
};
const acceptResponse=async (req, res) => {
    try {
      const { responseId } = req.params;
      const { responseBack } = req.body;
  
      // Find the response by ID and update responseBack field
      const response = await Response.findByIdAndUpdate(
        responseId,
        { responseBack: responseBack },
        { new: true } // Return the updated response
      );
  
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }
  
      res.json(response);
    } catch (error) {
      console.error('Error updating responseBack field:', error);
      res.status(500).json({ error: 'Could not update responseBack field' });
    }
  }

  export { createResponse, acceptResponse };
