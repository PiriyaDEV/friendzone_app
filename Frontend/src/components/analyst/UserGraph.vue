<template>
  <div>
    <div>
      <apexchart
        type="line"
        height="200"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import AnalystService from "@/services/analyst.service";

export default {
  data: function() {
    return {
      series: [
        {
          name: "User",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [],
          labels: {
            formatter: function(value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "dd MMM yy");
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        yaxis: [
          {
            labels: {
              formatter: function(val) {
                return val.toFixed(0);
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.getUserHistorySummary();
  },
  methods: {
    async getUserHistorySummary() {
      var count = [];
      var stringDate = [];

      await AnalystService.getUserHistorySummary().then((res) => {
        if (res) {
          res.forEach((item) => {
            count.push(item.count);
            stringDate.push(item.stringDate);
          });
        }
      });
      this.chartOptions = {
        series: [
          {
            data: count
          }
        ],
        xaxis: {
          categories: stringDate
        }
      };
    }
  }
};
</script>

<style scoped></style>
