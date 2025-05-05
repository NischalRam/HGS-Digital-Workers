import { AllAgentConfigsType } from "@/app/types";
import frontDeskAuthentication from "./frontDeskAuthentication";
import customerServiceRetail from "./customerServiceRetail";
import simpleExample from "./simpleExample";
import jarvis from "./jarvis";
import friday from "./TravelAgent";
import harmony from "./HRPike";


export const allAgentSets: AllAgentConfigsType = {
  frontDeskAuthentication,
  customerServiceRetail,
  simpleExample,
  jarvis,
  friday,
  harmony,
};

export const defaultAgentSetKey = "harmony";
