const fs = require("fs");
const axios = require("axios");
const registry = require("../routes/registry.json");
const loadbalancer = require("../services/loadbalancer");
const gatewayCtl = {
  GatewayHandleAllRoutes: (req, res) => {
    const service = registry.services[req.params.apiName];
    if (service) {
      if (!service.loadBalancerStrategy) {
        fs.writeFile(
          "./routes/registry.json",
          JSON.stringify(registry),
          (error) => {
            if (error) {
              res.send("Couldn't write load loadBalancer");
            }
          }
        );
      }
      const newIndex = loadbalancer[service.loadBalancerStrategy](service);
      const url = service.instances[newIndex].url;
      console.log(url);
      axios({
        method: req.method,
        url: url + req.params.path,
        headers: {
          "Content-Type": "application/json",
        },
        data: req.body,
      })
        .then((response) => {
          res.send(response.data);
        })
        .catch((error) => {
          res.send(error.response.data);
        });
    } else {
      return res.status(500).json({
        msg: "Api name does't Exit",
      });
    }
  },
};
module.exports = gatewayCtl;
