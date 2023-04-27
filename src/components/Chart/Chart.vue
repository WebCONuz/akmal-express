<template>
  <Line :data="ChartData" :options="options" class="w-full max-h-[500px]" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: "Chart",
  props: {
    result: Object,
  },
  components: {
    Line,
  },

  data() {
    return {
      options: {
        responsive: true,
        verticalLine: false,
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              display: true,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#000",
            boxWidth: 181,
            boxHei: 121,
            boxPadding: 300,
            bodyColor: "#000",
            usePointStyle: false,
            displayColors: false,
          },
        },
      },
    };
  },

  computed: {
    ChartData() {
      return {
        labels: this.result.days,
        datasets: [
          {
            label: "Mahsulot",
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 320);

              gradient.addColorStop(0.2, "#0B63F81f");
              gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");

              return gradient;
            },
            borderColor: "#0B63F8",
            borderWidth: 5,
            hoverBorderWidth: 10,
            tension: 0.6,
            fill: true,
            data: this.result.order,
            pointStyle: true,
          },
        ],
      };
    },
  },
};
</script>
