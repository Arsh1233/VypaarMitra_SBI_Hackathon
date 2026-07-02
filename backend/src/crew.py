import json
from crewai import Agent, Task, Crew, Process
from pydantic import BaseModel, Field

# Using a dummy LLM configuration to allow the file to be instantiated without real API keys
class DummyLLM:
    def bind(self, **kwargs):
        return self
    def invoke(self, *args, **kwargs):
        return "Mocked response"
    def with_structured_output(self, *args, **kwargs):
        return self

dummy_llm = DummyLLM()

# Agent Definitions
registry_agent = Agent(
    role='RegistryAgent',
    goal='Connect to MCA/GST mocks and fetch company registry details.',
    backstory='An expert API integrator for Indian government registries.',
    llm=dummy_llm,
    allow_delegation=False
)

vision_agent = Agent(
    role='VisionAgent',
    goal='Analyze document images using EfficientNet and LayoutLMv3 for OCR and forgery detection.',
    backstory='A computer vision specialist adept at spotting blurry images and deepfakes.',
    llm=dummy_llm,
    allow_delegation=False
)

matcher_agent = Agent(
    role='MatcherAgent',
    goal='Compare names across documents using Levenshtein distance to detect mismatches.',
    backstory='A detail-oriented data matching analyst.',
    llm=dummy_llm,
    allow_delegation=False
)

ubo_agent = Agent(
    role='UBOAgent',
    goal='Parse complex shareholding patterns to identify Ultimate Beneficial Owners (UBO).',
    backstory='A forensic accountant specializing in corporate structures.',
    llm=dummy_llm,
    allow_delegation=False
)

alternative_scoring_agent = Agent(
    role='AlternativeScoringAgent',
    goal='Generate a financial inclusion score from alternative data like utility bills when registry data is unavailable (404).',
    backstory='An alternative credit scoring expert for zero-footprint customers.',
    llm=dummy_llm,
    allow_delegation=False
)

def calculate_financial_inclusion_score(synthetic_json: str) -> dict:
    """
    Parses a synthetic JSON of mobile recharges and electricity bills to 
    generate a financial_inclusion_score (0-100).
    """
    try:
        data = json.loads(synthetic_json)
        recharges = data.get("mobile_recharges", [])
        bills = data.get("electricity_bills", [])
        
        # Simple scoring logic for mock purposes
        score = min(100, len(recharges) * 10 + len(bills) * 20)
        return {"financial_inclusion_score": score, "status": "success"}
    except Exception as e:
        return {"financial_inclusion_score": 0, "status": "error", "message": str(e)}

# Define Vyapaar Mitra Crew
vyapaar_mitra_crew = Crew(
    agents=[
        registry_agent,
        vision_agent,
        matcher_agent,
        ubo_agent,
        alternative_scoring_agent
    ],
    tasks=[], # Tasks would be dynamically assigned based on the LangGraph state
    process=Process.sequential,
    verbose=True
)
