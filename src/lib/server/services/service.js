// @ts-nocheck
import ApiCall from "./apiCall.js";
import PingCall from "./pingCall.js";
import TcpCall from "./tcpCall.js";
import DnsCall from "./dnsCall.js";

class Service {
  service;

  constructor(monitor) {
    if (monitor.monitor_type === "API") {
      this.service = new ApiCall(monitor);
    } else if (monitor.monitor_type === "PING") {
      this.service = new PingCall(monitor);
    } else if (monitor.monitor_type === "TCP") {
      this.service = new TcpCall(monitor);
    } else if (monitor.monitor_type === "DNS") {
      this.service = new DnsCall(monitor);
    } else if (monitor.monitor_type === "NONE") {
      this.service = null;
    } else {
      console.log("Invalid monitor.monitor_type ", monitor.monitor_type);
      process.exit(1);
    }
  }
  async execute() {
    return await this.service.execute();
  }
}

export default Service;
