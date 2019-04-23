(function() {
    var json_file = "trace_test.json";
    var trace_events = null;
    var vue_data = null;
    $(document).ready(function() {
        vue_data = new Vue({
            el: '#events_list_app',
            data: {
                pid: [],
                // tid: [],
                // ph: [],
                cat: [],
                events: []
            }
        });

        $.getJSON(json_file, function(data) {
            trace_data = data.traceEvents;
            trace_data.sort(function(a, b) {
                return a.ts - b.ts;
            });
            var pid = [];
            var pidd = [];
            // var tid = [];
            // var tidd = [];
            // var ph = [];
            // var phd = [];
            var cat = [];
            var catd = [];
            $.each(trace_data, function(index, item) {
                if (pidd[item.pid] != 1) {
                    pidd[item.pid] = 1;
                    pid.push(item.pid);
                }
                // if (tidd[item.tid] != 1) {
                //     tidd[item.tid] = 1;
                //     tid.push(item.tid);
                // }
                // if (phd[item.ph] != 1) {
                //     phd[item.ph] = 1;
                //     ph.push(item.ph);
                // }
                var cats = item.cat.split(',');
                item.cats = cats;
                $.each(cats, function(index, data) {
                    if (catd[data] == 1) return;
                    catd[data] = 1;
                    cat.push(data);
                });
            });
            vue_data.pid = pid;
            // vue_data.tid = tid;
            // vue_data.ph = ph;
            vue_data.cat = cat;
        });

        $('#pid_all').click(function() {
            $.each($("[name='pid'"), function(index, pid) {
                pid.checked = !pid.checked;
            });
        });

        $('#cat_all').click(function() {
            $.each($("[name='cat'"), function(index, cat) {
                cat.checked = !cat.checked;
            });
        });

        $('#filter').click(function() {
            var result = [];
            var pids = [];
            // var tids = [];
            // var phs = [];
            var cats = [];
            $.each($("[name='pid'"), function(index, pid) {
                if (pid.checked) pids[pid.value] = 1;
            });
            // $.each($("[name='tid'"), function(index, tid) {
            //     if (tid.checked) tids[tid.value] = 1;
            // });
            // $.each($("[name='ph'"), function(index, ph) {
            //     if (ph.checked) phs[ph.value] = 1;
            // });
            $.each($("[name='cat'"), function(index, cat) {
                if (cat.checked) cats[cat.value] = 1;
            });

            $.each(trace_data, function(index, data) {
                if (pids[data.pid] != 1) return;
                // if (tids[data.tid] != 1) return;
                // if (phs[data.ph] != 1) return;

                var has_cat = false;
                for (var i = 0; i < data.cats.length; ++i) {
                    if (cats[data.cats[i]] == 1) {
                        has_cat = true;
                        break;
                    }
                }

                if (has_cat) result.push(data);
            });

            vue_data.events = result;
            alert('Filter Complete!');
        });
    });
})();