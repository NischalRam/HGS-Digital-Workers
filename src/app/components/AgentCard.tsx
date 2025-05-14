import { Bot, Phone } from "lucide-react"
import { AgentConfig, AgentMappings, LandingMappings } from "../types"

interface AgentCardProps {
    key: string,
    scenarioKey: string,
    agent: AgentConfig,
    agentMappings: AgentMappings,
    landingMappings: LandingMappings
}

const AgentCard = ({
    scenarioKey,
    agent,
    agentMappings,
    landingMappings,
}: AgentCardProps) => {
    const handleAgentChange = (newAgentConfig: string) => {
        const url = new URL(window.location.toString());
        url.searchParams.set("agentConfig", newAgentConfig);
        window.location.replace(url.toString());
    };

    return (
        <div
            className="agent-card opacity-0 transform translate-y-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => {
                handleAgentChange(scenarioKey)
            }}
            style={{ width: "100%" }}
        >
            <div
                className="h-2 w-full"
                style={{ backgroundColor: agentMappings[(agent?.name ?? "").toLowerCase()]?.fontColor ?? "#2A3B8F" }}
            ></div>
            <div className="p-6 flex flex-col items-center">
                <div
                    className="mb-4 p-3 rounded-full"
                    style={{
                        color: agentMappings[(agent?.name ?? "").toLowerCase()]?.fontColor ?? "#2A3B8F",
                        paddingBottom: "0px"
                    }}
                >
                    {landingMappings[(agent?.name ?? "").toLowerCase()]?.icon ?? <Bot size={20} color="#2A3B8F" />}
                </div>

                <h3
                    className="text-xl font-semibold mb-1"
                    style={{ color: agentMappings[(agent?.name ?? "").toLowerCase()]?.fontColor ?? "#2A3B8F" }}
                >
                    {landingMappings[(agent?.name ?? "").toLowerCase()]?.name ?? agent.name}
                </h3>

                <span className="text-sm text-gray-500 font-semibold mb-4 text-center">
                    {landingMappings[(agent?.name ?? "").toLowerCase()]?.description ?? `${scenarioKey} scenario`}
                </span>

                <div className="mt-auto flex items-center justify-center">
                    <div
                        className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors"
                        style={{ color: agentMappings[(agent?.name ?? "").toLowerCase()]?.fontColor ?? "#2A3B8F" }}
                        onClick={() => {
                            handleAgentChange(scenarioKey)
                        }}
                    >
                        <Phone size={18} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AgentCard