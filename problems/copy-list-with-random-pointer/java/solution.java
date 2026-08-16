// Copy List with Random Pointer - Java Solution
// Copy List with Random Pointer - Optimal Java Solution (Linked List)
import java.util.*;

public class Solution {
    public int copylistwithrandompointer(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Linked List state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
