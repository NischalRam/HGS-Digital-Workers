import { AllAgentConfigsType } from "@/app/types";
import frontDeskAuthentication from "./frontDeskAuthentication";
import customerServiceRetail from "./customerServiceRetail";
import simpleExample from "./simpleExample";
import jarvis from "./jarvis";
import friday from "./TravelAgent";
import harmony from "./HRPike";
import david from "./david"


export const allAgentSets: AllAgentConfigsType = {
  frontDeskAuthentication,
  customerServiceRetail,
  simpleExample,
  jarvis,
  friday,
  harmony,
  david,
};

export const defaultAgentSetKey = "harmony";
