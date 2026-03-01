'use strict';

class AiRouter {
    constructor(models) {
        this.models = models;
    }

    routeRequest(request) {
        // Implement logic to route requests based on model type
        const { modelType } = request;
        const model = this.models[modelType];

        if (!model) {
            throw new Error('Model type not supported');
        }

        return model.processRequest(request);
    }
}

// Example initialization
const models = {
    openai: new OpenAIModel(),
    gemini: new GeminiModel(),
    claude: new ClaudeModel(),
};

const aiRouter = new AiRouter(models);

module.exports = aiRouter;
