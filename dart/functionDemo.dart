import 'dart:math';

class Point_my {
  double x = 0;
  double y = 0;

  Point_my(this.x, this.y);

  double distanceTo(double x, double y) {
    var dx = this.x - x;
    var dy = this.y - y;
    return sqrt(dx * dx + dy * dy);
  }
}

test(double x, double y) {
  var a = Point_my(0, 0);
  var length = a.distanceTo(x, y);
  print(length);
}
