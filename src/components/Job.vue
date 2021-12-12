<template>
  <div>
    <div class="container">
      <div>
        <span>{{ filterById(jobs, id) }}</span>
      </div>
      <div class="topicBar row">
        <div class="col-8 topic">
          Files /
          {{
            new Date(job.queuedTime).toLocaleString("default", {
              year: "numeric",
            }) +
            "-" +
            new Date(job.queuedTime).toLocaleString("default", {
              month: "numeric",
            }) +
            "-" +
            new Date(job.queuedTime).toLocaleString("default", {
              day: "numeric",
            }) +
            " " +
            new Date(job.queuedTime)
              .toUTCString("si-LK", { hour12: false })
              .split(" ")[4]
          }}
        </div>
        <div class="col-4">
          <button
            @click="goToHome"
            class="btn btn-primary"
            style="float: right"
          >
            Go To Home
          </button>
        </div>
      </div>
      <div class="innerContainer">
        <div style="margin-bottom: 10px">
          <span
            ><i class="fa fa-rocket"></i>&nbsp;&nbsp;(&nbsp;<label
              style="color: rgb(16, 116, 173); cursor: pointer"
              >{{ job.owner }}</label
            >&nbsp;)</span
          >
        </div>
        <div class="row header">
          <div class="col-2">Status</div>
          <div class="col-2">Queued</div>
          <div class="col-3">Started</div>
          <div class="col-3">Ended</div>
          <div class="col-2" style="text-align: right">Duration</div>
        </div>
        <div class="row record">
          <div class="col-2">
            <span :style="{ color: `${isFailed(job)}` }">{{
              job.jobStatus
            }}</span>
          </div>
          <div class="col-2">
            {{
              new Date(job.queuedTime).toLocaleString("default", {
                day: "numeric",
              }) +
              " " +
              new Date(job.queuedTime).toLocaleString("default", {
                month: "short",
              }) +
              " " +
              new Date(job.queuedTime).toLocaleString("default", {
                year: "numeric",
              }) +
              " " +
              new Date(job.queuedTime)
                .toUTCString("si-LK", { hour12: false })
                .split(" ")[4]
            }}
          </div>
          <div class="col-3">
            {{
              job.startTime === ""
                ? " - "
                : new Date(job.startTime)
                    .toUTCString("si-LK", { hour12: false })
                    .split(" ")[4]
            }}
          </div>
          <div class="col-3">
            {{
              job.endTime === ""
                ? " - "
                : new Date(job.endTime)
                    .toUTCString("si-LK", { hour12: false })
                    .split(" ")[4]
            }}
          </div>
          <div class="col-2" style="text-align: right">
            {{ calculateDuration(job) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      id: this.$route.params.id,
      jobs: [],
      job: {},
    };
  },
  mounted() {
    this.loadJsonData();
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id;
    },
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    filterById(jsonObject, id) {
      this.job = jsonObject.filter(function (jsonObject) {
        return jsonObject["id"] == id;
      })[0];
    },
  },
};
</script>

<style>
.topicBar {
  flex: auto;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  padding: 1%;
  background-color: rgb(245, 245, 245);
  color: rgb(16, 116, 173);
}

.topicBar {
  display: -webkit-flex;
  display: flex;
  align-items: center;
}

.innerContainer {
  margin-top: 20px;
}

.innerContainer .header {
  padding: 1% 0 1% 0;
  border-top: 1px solid lightGrey;
  border-bottom: 1px solid lightGrey;
  cursor: pointer;
  font-weight: bold;
}

.innerContainer .record {
  padding: 2% 0 2% 0;
  border-bottom: 1px solid lightGrey;
  cursor: pointer;
}

.innerContainer .record:hover {
  background-color: rgb(238, 238, 238);
}

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
</style>