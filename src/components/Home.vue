<template>
  <div>
    <div
      class="searchBar container"
      style="padding-top: 2%; padding-bottom: 2%"
    >
      <div class="row">
        <div class="col-8">
          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input
              v-model="input"
              id="search"
              type="text"
              class="form-control"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="col-4" style="text-align: right">
          <label
            style="
              background-color: lightgrey;
              padding: 1.5% 2.5% 1.5% 2.5%;
              border-radius: 10px;
            "
          >
            {{ startIndex }} - {{ endIndex }} of {{ countRows }}</label
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div class="record" v-for="job in filterByTerm" :key="job.id">
        <div class="row" @click="goToJobPage(job.id)">
          <div class="col-sm-8" :style="{ color: `${isFailed(job)}` }">
            <span
              ><i
                style="font-size: 1rem; color: black"
                :class="isFailedIcon(job)"
                :style="{ color: `${isFailedIconColor(job)}` }"
              ></i
            ></span>
            <span
              ><i
                class="fa fa-folder-open"
                style="font-size: 1rem; color: black"
                :style="{ color: `${isFailed(job)}` }"
              ></i
            ></span>
            <span>
              {{
                "/" +
                new Date(job.startTime).toLocaleString("default", {
                  year: "numeric",
                }) +
                "-" +
                new Date(job.startTime).toLocaleString("default", {
                  month: "numeric",
                }) +
                "-" +
                new Date(job.startTime).toLocaleString("default", {
                  day: "numeric",
                }) +
                " " +
                new Date(job.startTime)
                  .toUTCString("si-LK", { hour12: false })
                  .split(" ")[4]
              }}
            </span>
          </div>
          <div class="col-sm-2">
            <label :style="{ color: `${isFailed(job)}` }">{{
              job.owner
            }}</label>
          </div>
          <div class="col-sm-2" style="text-align: right">
            <span :style="{ color: `${isFailed(job)}` }"
              >{{ job.jobStatus }}
            </span>
            <span :style="{ color: `${isFailed(job)}` }">
              {{
                job.endTime === ""
                  ? ""
                  : " on " +
                    new Date(job.endTime).toLocaleString("default", {
                      month: "short",
                    }) +
                    " " +
                    new Date(job.endTime).getDate()
              }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="navContainer row"
        style="margin-top: 10px; text-align: center"
      >
        <ul class="pagination">
          <li class="page-item disable-select" :class="isAtFirstPage(startIndex)" v-on:click="prevPage()" style="width: 50%;float: left;">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item disable-select" v-on:click="nextPage()" style="width: 50%;float: right;">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      counter: 0,
      startIndex: 1,
      endIndex: 9,
      jobs: [],
      items: [],
      searchTerm: "",
      rowCount: 0,
      timeout: null,
      debouncedInput: "",
    };
  },
  mounted() {
    this.loadJsonData();
  },
  methods: {
    nextPage() {
      let tempValue = this.endIndex + 9;
      if (tempValue > this.countRows) {
        if (this.endIndex != this.countRows) {
          this.startIndex += 9;
          this.endIndex = this.countRows;
        }
      } else {
        this.startIndex += 9;
        this.endIndex += 9;
      }
    },
    prevPage() {
      if (this.endIndex == this.countRows) {
        this.endIndex = this.startIndex - 1;
        this.startIndex = this.endIndex - 8;
        console.log("Back : " + this.startIndex + ", " + this.endIndex);
      } else if (this.startIndex != 1) {
        this.startIndex -= 9;
        this.endIndex -= 9;
      }
    },
    goToJobPage(value) {
      this.$router.push({ name: "job", params: { id: value } });
    },
  },
  computed: {
    filterByTerm() {
      if (this.searchTerm === "") {
        if (this.jobs) {
          this.items = [...this.jobs];
          return this.items.slice(this.startIndex - 1, this.endIndex);
        }
      } else {
        let tempList = this.jobs.filter((job) => {
          if (
            job.owner
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase())
          ) {
            return job;
          }
          if (
            job.jobStatus
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase())
          ) {
            return job;
          }
          if (
            job.customer
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase())
          ) {
            return job;
          }
          if (
            job.startTime
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase())
          ) {
            return job;
          }
        });
        this.rowCount = tempList.length;
        this.items = [...tempList];
        return this.items.slice(this.startIndex - 1, this.endIndex);
      }
    },
    countRows() {
      if (this.searchTerm === "") {
        return this.jobs.length;
      }
      return this.rowCount;
    },
    input: {
      get() {
        return this.debouncedInput;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedInput = val;
          this.startIndex = 1;
          this.endIndex = 9;
          this.searchTerm = this.debouncedInput;
        }, 300);
      },
    },
  },
};
</script>

<style>
.disable-select {
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
.default {
  border: 2px solid transparent;
}

.new {
  border: 2px solid black;
  width: 70%;
  padding: 1%;
}

.record {
  padding: 2%;
  border-top: 1px solid lightGrey;
  cursor: pointer;
}

.record:hover {
  background-color: rgb(245, 245, 245);
}

.record span {
  margin-left: 2%;
}

.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
